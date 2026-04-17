def call (String filename , String tag){
	println "Updating the k8s deploment image tag  => ${filename}:${tag}"
	sh """
		export IMAGE_TAG=${tag}
		yq -i '.spec.template.spec.containers[0].image 
		       |= sub(":.*",":" + STRENV(IMAGE_TAG))' k8s/${filename}-deploy.yaml
	"""
	println "Successfully Updated the k8s deploment image tag !! "

}
