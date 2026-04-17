def call(String username, String img, String tag){
	println "Login to Docker Hub !!"

	withCredentials([usernamePassword(
	    credentialsId: 'docker',
	    usernameVariable: 'DOCKER_USER'
	    passwordVariable: 'DOCKER_PASS'
	)]){
	   try{
		// Login to Docker Hub
		sh """ echo "$DOCKER_USER" | docker login -u "$DOCKER_USER" --password-stdin """
		sh " docker push ${username}/${img}:${tag}"
                 println "Successfully pushed ${username}/${img}:${tag} to Docker Hub."
	   } catch(Exception e){
		println "Failed to push Docker image ${username}/${img}:${tag}."
            	throw e
	   }	
        }
} 

