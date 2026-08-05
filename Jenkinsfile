@Library('releng-pipeline') _

hugo (
  appName: 'jakartaee',
  productionDomain: 'jakarta.ee',
  branchDomain: 'jakarta.ee',
  previewBranchesRegex: '.*',
  build: [
    containerImage: 'eclipsefdn/hugo-node:h0.144.2-n22.14.0',
    script: 'build.sh'
  ],
  deployment: [
    nginxServerConf: 'config/nginx/default.conf'
  ]
)
