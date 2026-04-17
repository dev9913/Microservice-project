def call(String filename , String username , String img , String tag){
	println "Pushing Updated K8S Deployment file to GitHub !!"
	withCredentials([
	string(credentialsId: 'email', variable: 'GIT_EMAIL'),
	usernamePassword(
		crdentailsId: 'GITHUB',
		usernameVariable: 'GITHUB_USER',
		passwordVariable: 'GITHUB_PASS'
	)]){
	    try{
		// Push to Github 
			
		sh """
		    set -e 
		    ste -x 

		    git config user.name "\$GIT_USER"
              	    git config user.email "\$GIT_EMAIL"

		    git pull origin main 
		    git status
		
		    git add k8s/${filename}-deploy.yaml
	            git commit -m "K8s Deployment Image Tag Updated on ${filename}-deploy.yaml file" || true
	            git push https://\$GIT_USER:\$GIT_TOKEN@github.com/${username}/Microservice-project.git HEAD:main	
		"""
	    } catch(Exception e){
		println "Failed to push ${username}/${img}:${tag} to GitHub."
		throw e
	    	

	}
}
