#!/bin/bash
# ===========================================================================
# Copyright (c) 2019 Eclipse Foundation and others.
# 
# This program and the accompanying materials are made
# available under the terms of the Eclipse Public License 2.0
# which is available at https://www.eclipse.org/legal/epl-2.0/
# 
# Contributors:
# Andrii Malytksyi (TomiTribe)
# 
# SPDX-License-Identifier: EPL-2.0
# ===========================================================================
#
# This script paginates the GraphQL API to get all authors.
#
# requires `bash, `jq` and `curl`
# set your credentials and org name below
# you need GH_TOKEN env variable for https://api.github.com/graphql
CREDENTIALS=$GH_TOKEN:x-oauth-basic
CURSOR=null
LIST_FILE=data/contributors/jakarta-ee-9.json
EXCLUDED_LIST=data/contributors/excluded-list.json

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

echo "Started contributor list generation..."

prList=$(echo $(pageTraverse getPrAuthors "repo:jakartaee/specifications" ".data.search") $(pageTraverse getPrAuthors "org:eclipse-ee4j" ".data.search") | jq -s '[ .[].data.search.nodes[].author | select(.login != null) ] | unique_by(.login)')
echo "[prList] Fetched PRs Authors list, total amount: $(echo $prList | jq '. | length') users."

commitList=$(echo $(getRepoData "jakartaee" "specifications"))

for repoName in $(echo $(pageTraverse getOrgRepos "org:eclipse-ee4j" ".data.search") | jq -s -r '.[].data.search.edges[].node.name' ); do
  commitList=$(echo $commitList $(getRepoData "eclipse-ee4j" $repoName))
done

totalList=$(echo $prList $commitList | jq -s '.[] | .[]' | jq -s '. | unique_by(.login)')
totalAmount=$(echo $totalList | jq '. | length')

if [ ! -z "$totalList" ]; then
  rm -rf $LIST_FILE
  echo $totalList | jq . > $LIST_FILE
  echo "[totalList] Updated $LIST_FILE, total amount: $totalAmount users."
else
  echo "[totalList] Something went wrong, file not updated."
  exit 64;
fi

filteredList=$(jq -n '[ $listFile[] | select(any(.login; contains($excludedList[]))==false) ]' --argfile listFile $LIST_FILE --argfile excludedList $EXCLUDED_LIST)
filteredAmount=$(echo $filteredList | jq '. | length')
if [[ $totalAmount != $filteredAmount ]]; then
  rm -rf $LIST_FILE
  echo $filteredList | jq . > $LIST_FILE
  echo "[filteredList] Updated $LIST_FILE, total filtered amount: $filteredAmount users."
else
  echo "[filteredList] File does not need filtering..."
fi

echo "Finished contributor list generation..."
