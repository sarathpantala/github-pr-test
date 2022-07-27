  pipeline {
  parameters {
          string(defaultValue: "", description: 'git_branch', name: 'git_branch');
          string(defaultValue: "test", description: 'nonce', name: 'nonce');
          string(defaultValue: "2", description: 'feature_count', name: 'feature_count');
  }
    agent any
  stages {
         stage('Pr-checks-analyzer') {
            steps {
            script {
            currentBuild.displayName = "${GIT_BRANCH}-${BUILD_NUMBER}"
            }                
            checkout scm: [
                      $class: 'GitSCM',
                      branches: [[name: 'master']],
                      doGenerateSubmoduleConfigurations: false,
                      extensions: [[$class: 'RelativeTargetDirectory',
                                      relativeTargetDir: 'github-pr-test']
                                  ], 
                      submoduleCfg: [], 
                      userRemoteConfigs: [
                          [
                              credentialsId: 'git-pr', 
                              url: 'git@github.com:sarathpantala/github-pr-test.git'
                          ]
                      ]
              ]
              sh '''
#!/bin/sh
chmod 777 ${WORKSPACE}/github-pr-test/git_pr_check.js
echo "TITLE :: $ghprbPullTitle" 
echo "COMMENT_BODY :: $ghprbCommentBody"
node ${WORKSPACE}/github-pr-test/git_pr_check.js "$ghprbPullTitle" "$ghprbCommentBody" "$ghprbPullLongDescription" 

                  

              '''   
        }
    }  
    }        
  }
