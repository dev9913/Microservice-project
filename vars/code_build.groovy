def call(String username, String imgname, String tag, String location){
	println"Building your $imgname:$tag Image ."
	try {
		sh "docker build -t $username/$imgname:$tag ./$location"
	} catch (Exception e) {
		println "Docker build failed for $imagename"
                throw e 
	}
	println "Successfully Build your $imgname:$tag Image !"

}

