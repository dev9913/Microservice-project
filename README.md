# 🚀 End-to-End DevOps Microservices Project

## 📌 Overview

This project demonstrates a **complete DevOps pipeline** for deploying a microservices-based application using modern tools and best practices.

### 🔧 Tech Stack

* Docker (Containerization)
* Kubernetes (Orchestration)
* Jenkins (CI Pipeline)
* Argo CD (GitOps CD)
* Terraform (Infrastructure)
* Ansible (Configuration)
* Trivy (Security)

---

## 🏗️ Architecture

```text id="a1v9v2"
Users
  ↓
Ingress
  ↓
Frontend (React)
  ↓
Backend Microservices (Node.js)
   ├── User Service
   ├── Product Service
   └── Order Service
  ↓
MongoDB
```

---

## 📂 Project Structure

```text id="n6q1qg"
.
├── frontend/
├── backend/
│   ├── user-service/
│   ├── product-service/
│   └── order-service/
├── k8s/
├── argocd/
├── terraform/
├── ansible/
├── vars/              # Jenkins shared library
├── Jenkinsfile
└── README.md
```

---

## 🐳 Docker

Each service is containerized and pushed to Docker Hub.

```bash id="v3lh7u"
docker build -t <docker-user>/<service>:<tag> .
docker push <docker-user>/<service>:<tag>
```

---

## ☸️ Kubernetes Deployment

Located in `k8s/`

Includes:

* Deployments
* Services
* Ingress
* ConfigMap
* HPA (Auto Scaling)
* MongoDB setup

---

## ⚙️ Infrastructure (Terraform)

Located in `terraform/`

* Installs Argo CD using Helm
* Manages Kubernetes resources

---

## ⚙️ Configuration (Ansible)

Located in `ansible/`

* Automates cluster setup
* Installs components like Metrics Server

---

## 🔄 CI/CD Pipeline

Implemented using Jenkins.

### 🔁 Pipeline Flow

```text id="u0p7j6"
1. Validate Input
2. Code Checkout
3. Lint
4. Testing
5. Docker Build
6. Trivy Scan
7. Push to Docker Hub
8. Update K8s Manifests
```

---

## 🔐 Jenkins Credentials Setup (Required)

Before running the pipeline in Jenkins, you must create the following **secrets in Jenkins UI**.

---

### 📍 Step 1: Navigate

```text
Manage Jenkins → Manage Credentials → Global → Add Credentials
```

---

### 🔑 Step 2: Create Required Credentials

#### 1️⃣ GitHub Credentials

* Type: **Username with password**
* ID: `GITHUB`
* Username: your GitHub username
* Password: GitHub Personal Access Token

---

#### 2️⃣ DockerHub Credentials

* Type: **Username with password**
* ID: `docker`
* Username: your DockerHub username
* Password: DockerHub password / token

---

#### 3️⃣ Email (for Git / Notifications)

* Type: **String Credential**
* ID: `email`
* Value: your email (e.g. `yourmail@gmail.com`)

---

#### 4️⃣ Email for Notifications

* Type: **String Credential**
* ID: `USER_EMAIL`
* Value: your email

---

#### 5️⃣ Email Password

* Type: **String Credential**
* ID: `USER_EMAIL_PASS`
* Value: App password (recommended)

---



## ⚠️ Important Notes

* Do NOT hardcode secrets in code
* Always use Jenkins Credentials
* Use App Passwords instead of real passwords
* Rotate credentials regularly

---


### 🔒 Best Practices

* Store secrets in Jenkins Credentials
* Never expose passwords in code
* Use Kubernetes Secrets for DB credentials

---

## 🚀 GitOps Deployment

Handled by Argo CD.

### Flow:

```text id="u7g0r9"
Jenkins → Update GitHub → ArgoCD detects change → Auto deploy to Kubernetes
```

---

## 🔐 Security

Using Trivy:

* Scan Docker images
* Detect vulnerabilities
* Integrated into CI

---

## 🧠 Key Highlights

* Parallel Jenkins pipeline
* GitOps deployment
* Infrastructure as Code
* Secure CI/CD pipeline
* Microservices architecture

---


