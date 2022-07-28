pipelineJob("git-pr-check-pipeline") {
	description()
	keepDependencies(false)
	definition {
		Scm {
"""  pipeline {
    agent any
  stages {
         stage('Pr-checks-analyzer') {
            steps {
            script {
            currentBuild.displayName = "\${ghprbSourceBranch}-\${BUILD_NUMBER}"
            } 
            checkout scm: [
                      \$class: 'GitSCM',
                      branches: [[name: 'master']],
                      doGenerateSubmoduleConfigurations: false,
                      extensions: [[\$class: 'RelativeTargetDirectory',
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
chmod 777 \${WORKSPACE}/github-pr-test/git_pr_check.js
echo "TITLE :: \$ghprbPullTitle" 
echo "COMMENT_BODY :: \$ghprbCommentBody"
node \${WORKSPACE}/github-pr-test/git_pr_check.js "\$ghprbPullTitle" "\$ghprbCommentBody" "\$ghprbPullLongDescription" 
                  
              '''   
        }
    }  
    }"""		}
	}
	disabled(false)
	configure {
		it / 'properties' / 'com.coravy.hudson.plugins.github.GithubProjectProperty' {
			'projectUrl'('https://github.com/sarathpantala/sarathrepo/')
			displayName("Passed")
		}
	}
}
