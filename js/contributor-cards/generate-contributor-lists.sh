#!/bin/bash
# requires `bash, `jq` and `curl`
# set your credentials and org name below
#
# This script paginates the GraphQL API to get all authors.
#

# you need GH_TOKEN env variable for https://api.github.com/graphql
CREDENTIALS=$GH_TOKEN:x-oauth-basic
CURSOR=null
LIST_FILE=contributor-list.json

function getGrraphQL() {
    curl -s -X POST -u $CREDENTIALS -H "Content-Type: application/json" -d "{\"query\": $1}" https://api.github.com/graphql
}

function getPrAuthors() {
    QUERY=$(jq -aRs . <<< "{
  search(after: "$2", first: 100, query: \""$1" is:pr is:merged created:2019-10-01..2020-12-08\", type: ISSUE) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      ... on PullRequest {
        author {
        	... on User {
            login,
            name
          }
      	}
      }
    }
  }
}")
   echo $(getGrraphQL "$QUERY")
}

function getCommitAuthors() {
    QUERY=$(jq -aRs . <<< "{
  repository("$1") {
    ref(qualifiedName: \"master\") {
      target {
        ... on Commit {
          history(after: "$2", first: 100, since: \"2019-10-01T00:00:00+00:00\", until: \"2020-12-08T00:00:00+00:00\") {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                author {
                  user {
                    login,
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}")
   echo $(getGrraphQL "$QUERY")
}

function getOrgRepos() {
  QUERY=$(jq -aRs . <<< "{
  search(after: "$2", first: 100, query: \"$1 pushed:2019-10-01..2020-12-08 sort:created\", type: REPOSITORY) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ... on Repository {
          name
        }
      }
    }
  }
}")
   echo $(getGrraphQL "$QUERY")
}


function pageTraverse() {
    output=""
    while true; do
        page=$($1 "$2" "$CURSOR")
        output=$(echo "$output" "$page")
        hasNextPage=$(echo "$page" | jq "$3".pageInfo.hasNextPage)
        errorMessage=$(echo "$page" | jq .message)
        if [ "$errorMessage" != null ]; then
          echo "Error: $errorMessage" 1>&2
          exit 64
        fi
        if [ "$hasNextPage" = "true" ]; then
            CURSOR='"'$(echo "$page" | jq -r "$3".pageInfo.endCursor)'"'
        else
            break
        fi
        sleep 1
    done
    echo $output
}

function getRepoData() {
  echo $(pageTraverse getCommitAuthors 'owner: "'$1'", name: "'$2'"' ".data.repository.ref.target.history.pageInfo") | jq -s '.[].data.repository.ref.target.history.edges'| jq '[ .[].node.author.user | select(.login != null) ] | unique_by(.login)'
}

prList=$(echo $(pageTraverse getPrAuthors "repo:jakartaee/specifications" ".data.search") $(pageTraverse getPrAuthors "org:eclipse-ee4j" ".data.search") | jq -s '[ .[].data.search.nodes[].author | select(.login != null) ] | unique_by(.login)')
commitList=$(echo $(getRepoData "jakartaee" "specifications"))

for repoName in $(echo $(pageTraverse getOrgRepos "org:eclipse-ee4j" ".data.search") | jq -s -r '.[].data.search.edges[].node.name' ); do
  commitList=$(echo $commitList $(getRepoData "eclipse-ee4j" $repoName))
done

finalList=$(echo $prList $commitList | jq -s '.[] | .[]' | jq -s '. | unique_by(.login)')

if [ ! -z "$finalList" ]; then
  rm -rf $LIST_FILE
  echo $finalList | jq . > $LIST_FILE
  echo "Updated $LIST_FILE, total amount: $(echo $finalList | jq '. | length') users."
else
  echo "Something went wrong file not updated"
fi
