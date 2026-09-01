@Library('releng-pipeline') _

hugo (
  appName: 'jakartaee',
  productionBranchName: 'src',
  productionDomain: 'jakarta.ee',
  build: [
    containerImage: 'eclipsefdn/hugo-node:h0.144.2-n22.14.0',
    containerBuildMemoryLimits: '4Gi',
    script: 'build.sh'
  ],
  deployment: [
    nginxServerConf: 'config/nginx/default.conf'
  ]
)
