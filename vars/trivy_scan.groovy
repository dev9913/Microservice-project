def call(String username , String img , String tag){

    println "Scanning Docker Image ==> ${username}/${img}:${tag}"

    sh """
        bash -c '
        set -euo pipefail
        export TRIVY_CACHE_DIR="\$WORKSPACE/.trivy-cache-${img}"

        trivy image \
          --scanners vuln \
          --skip-version-check \
          --exit-code 1 \
          --severity CRITICAL \
          --format table \
          ${username}/${img}:${tag} | tee trivy-${img}-${tag}.txt
        '
    """

    println "IMAGE SCAN Successfully ${username}/${img}:${tag}"
}
