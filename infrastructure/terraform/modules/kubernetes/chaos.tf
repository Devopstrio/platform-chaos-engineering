resource "kubernetes_namespace" "chaos_mesh" {
  metadata {
    name = "chaos-testing"
    labels = {
      "admission-webhook" = "enabled"
    }
  }
}

resource "helm_release" "chaos_engine" {
  name       = "chaos-mesh"
  repository = "https://charts.chaos-mesh.org"
  chart      = "chaos-mesh"
  namespace  = kubernetes_namespace.chaos_mesh.metadata[0].name

  set {
    name  = "dashboard.enabled"
    value = "false" # We use our custom enterprise dashboard
  }

  set {
    name  = "chaosDaemon.runtime"
    value = "containerd"
  }
}

# Example Guardrail Policy
resource "kubernetes_network_policy" "chaos_isolation" {
  metadata {
    name      = "chaos-blast-radius-limit"
    namespace = "production"
  }

  spec {
    pod_selector {
      match_labels = {
        "app" = "critical-db"
      }
    }
    # Deny all chaos-originated traffic to critical DBs
    ingress {
      from {
        namespace_selector {
          match_labels = {
            "name" = "chaos-testing"
          }
        }
      }
    }
    policy_types = ["Ingress"]
  }
}
