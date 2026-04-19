resource "kubernetes_namespace_v1" "argocd" {
  metadata {
    name = "argocd"
  }
}


resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = kubernetes_namespace_v1.argocd.metadata[0].name
  depends_on = [kubernetes_namespace_v1.argocd]
  wait       = true
  timeout    = 600
  values = [
    file("${path.module}/values/argocd-value.yaml")
  ]
}
