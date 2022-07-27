  pipeline {
    agent any
  stages {
         stage('Pr-checks-analyzer') {
            steps {
            script {
            currentBuild.displayName = "${git_branch}-${BUILD_NUMBER}"
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
chmod 777 ${WORKSPACE}/github-pr-test/git-pr-checks-new.js
echo "TITLE :: $ghprbPullTitle" 
echo "COMMENT_BODY :: $ghprbCommentBody"
node ${WORKSPACE}/github-pr-test/git-pr-checks-new.js "$ghprbPullTitle" "$ghprbCommentBody" "$ghprbPullLongDescription" 

                  

              '''   
        }
    }  
    }        
  }