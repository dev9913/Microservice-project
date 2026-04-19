// Deploy ArgoCD Project

resource "kubernetes_manifest" "argo_proj_deploy" {
  manifest   = yamldecode(file("${path.module}./argocd/project.yaml"))
  depends_on = [helm_release.argocd]
}

// Deploy ArgoCD Application

resource "kubernetes_manifest" "argo_app_deploy" {
  manifest   = yamldecode(file("${path.module}./argocd/application.yaml"))
  depends_on = [kubernetes_manifest.argo_proj_deploy]
}
