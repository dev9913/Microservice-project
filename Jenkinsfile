@Library('micro-svc') _

pipeline{
    agent { label 'agent-proj' }

    options {
        disableConcurrentBuilds()
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
    }
        
    parameters {
        string(name: 'IMAGE_TAG', defaultValue: '3.0.0', description: 'Docker image tag')
    }
    
    environment {
	DOCKER_USER = "dev7878"
        GIT_USER    = "dev9913"
	ARTIFACTS                   = '**/*.log,trivy-*.txt'
	USER_EMAIL                  = credentials('USER_EMAIL')
        USER_EMAIL_PASSWORD         = credentials('USER_EMAIL_PASS')
    }
	
    stages{

        /* ================= VALIDATE INPUT ================= */

        stage('Validate Input') {
            steps {
                script {
                    if (!params.IMAGE_TAG?.trim()) {
                        error "IMAGE_TAG is required"
                    }
                }
            }
        }

        /* ================= Code Check-Out ================= */

	stage('Code-Checkout'){
	   steps {
	      script {
	         git_checkout("https://github.com/dev9913/Microservice-project/","main")	
	      }
	   }
	}

        /* ================= LINT ================= */
        stage('Lint') {
            steps {
                script {
                    parallel failFast: true,
                        frontend: {
                            sh 'cd frontend && npm ci && npm run lint'
                        },
                        user_svc: {
                            sh 'cd backend/user-service && npm ci && npm run lint'
                        },
                        product_svc: {
                            sh 'cd backend/product-service && npm ci && npm run lint'
                        },
                        order_svc: {
                            sh 'cd backend/order-service && npm ci && npm run lint'
                        }
                }
            }
        }	
        /* ================= TESTING  ================= */

        stage('Testing') {
 	   steps {
    	      script {
      	          parallel failFast: true,
                       frontend: {
    			   sh 'cd frontend && npm ci && npm test || exit 1'
                       },
        	       user_svc: {
          	           sh 'cd backend/user-service && npm ci && npm test || exit 1'
        	       },
        	       product_svc: {
          	       	   sh 'cd backend/product-service && npm ci && npm test || exit 1'
                       },
                       order_svc: {
                            sh 'cd backend/order-service && npm ci && npm test || exit 1'
                       }
    	      }
           }
        }

	/* ================= DOCKER IMAGE BUILD ================= */

	stage('Code-Build'){
           when { branch 'main' }
           steps {
              script {
		  parallel failFast: true,
		      frontend: {				
                 	  code_build(DOCKER_USER,"micro-svc-frontend",params.IMAGE_TAG,"frontend")    
              	      },
		      user_svc: {
			  code_build(DOCKER_USER,"backend-user-svc",params.IMAGE_TAG,"backend/user-service")
		      },
		      product_svc: {
			  code_build(DOCKER_USER,"backend-product-svc",params.IMAGE_TAG,"backend/product-service")
		      },
		      order_svc: {
			  code_build(DOCKER_USER,"backend-order-svc",params.IMAGE_TAG,"backend/order-service")
		      }
	      } 
           }    
        }
	
        /* =================  IMAGE SCAN ================= */
	
	stage('Image Scan'){
	   steps {
	      script {
		  parallel failFast: true , 
		      frontend: {
                          trivy_scan(DOCKER_USER,"micro-svc-frontend",params.IMAGE_TAG)
                      },
                      user_svc: {
                          trivy_scan(DOCKER_USER,"backend-user-svc",params.IMAGE_TAG)
                      },
                      product_svc: {
                          trivy_scan(DOCKER_USER,"backend-product-svc",params.IMAGE_TAG)
                      },
                      order_svc: {
                          trivy_scan(DOCKER_USER,"backend-order-svc",params.IMAGE_TAG)
                      }
	      }
	   }
	}

       /* =================  IMAGE PUSH TO DOCKER-HUB ================= */

       stage('Image push'){
	   when { branch 'main' }
           steps {
              script {
                  parallel failFast: true ,
                      frontend: {
                          docker_push(DOCKER_USER,"micro-svc-frontend",params.IMAGE_TAG)
                      },
                      user_svc: {
                          docker_push(DOCKER_USER,"backend-user-svc",params.IMAGE_TAG)
                      },
                      product_svc: {
                          docker_push(DOCKER_USER,"backend-product-svc",params.IMAGE_TAG)
                      },
                      order_svc: {
                          docker_push(DOCKER_USER,"backend-order-svc",params.IMAGE_TAG)
                      }
              }
           }    
        }

	/* ================= UPDATE THE K8S IMAGE ON GIT-HUB   ================= */
	
	stage('K8S Deployment Image update'){
           when { branch 'main' }
           steps {
              script {
                  parallel failFast: true ,
                      frontend: {
                          k8s_image_update("frontend",params.IMAGE_TAG)
			  k8s_image_push_on_github("frontend",GIT_USER,"micro-svc-frontend",params.IMAGE_TAG)
                      },
                      user_svc: {
                          k8s_image_update("user-svc",params.IMAGE_TAG)
                          k8s_image_push_on_github("user-svc",GIT_USER,"backend-user-svc",params.IMAGE_TAG)
                      },
                      product_svc: {
                          k8s_image_update("product-svc",params.IMAGE_TAG)
                          k8s_image_push_on_github("product-svc",GIT_USER,"backend-product-svc",params.IMAGE_TAG)
                      },
                      order_svc: {
                          k8s_image_update("order-svc",params.IMAGE_TAG)
			  k8s_image_push_on_github("order-svc",GIT_USER,"backend-order-svc",params.IMAGE_TAG)
                      }
              }
           }
        }
  
	/* ================= Ci Pipeline is completed  ================= */

 }




    /* ================= POST ACTIONS ================= */

post {
   success {
      archiveArtifacts artifacts: env.ARTIFACTS,
         	allowEmptyArchive: true
      emailext(
          to: "${env.USER_EMAIL}",
          subject: "SUCCESS : ${env.JOB_NAME} #${env.BUILD_NUMBER}",
          body: "Bhai Pipeline Completed Successfully.\n${env.BUILD_URL}",
          attachLog: true,
          attachmentsPattern: '**/*.log,trivy-*.txt'
      )
   }
   failure {
      archiveArtifacts artifacts: env.ARTIFACTS,
      		allowEmptyArchive: true
      emailext(
          to: "${env.USER_EMAIL}",
          subject: "FAILED : ${env.JOB_NAME} #${env.BUILD_NUMBER}",
          body: "Bhai Pipeline Failed.\nCheck logs:\n${env.BUILD_URL}",
          attachLog: true,
          attachmentsPattern: '**/*.log,trivy-*.txt'
      )
   }
   unstable {
      archiveArtifacts artifacts: env.ARTIFACTS,
                allowEmptyArchive: true
      emailext(
          to: "${env.USER_EMAIL}",
          subject: "UNSTABLE : ${env.JOB_NAME} #${env.BUILD_NUMBER}",
          body: "Bhai Pipeline is Unstable please fix it .\n${env.BUILD_URL}",
          attachLog: true,
          attachmentsPattern: '**/*.log,trivy-*.txt'
      )
   }
   always {
      cleanWs(deleteDirs: true)
      sh 'rm -rf $WORKSPACE/.trivy-cache-* || true'
   }
   	
}

}
