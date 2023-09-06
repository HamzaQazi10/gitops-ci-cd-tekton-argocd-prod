# Weekly Project 
## Points to Verify:
* Dockerfile should exists in git repository with 'D' capital. 
* Don't forgot to create a new repository in DockerHub.
## Task: 01 Configure a Tekton pipeline to clone this repository, build a Docker image and push to a DockerHub repository.
The task is to create a CI pipeline on Tekton that has two tasks which are:
1. Clones the repository.
2. Build and push docker image.
## Steps
1. Install the Tekton using the below command.
```bash 
kubectl apply --filename \
https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
```
2. Create a Kubernetes Secret, docker-credentials.yaml with your credentials:
```bash 
apiVersion: v1
kind: Secret
metadata:
  name: docker-credentials
data:
  config.json: efuJAmF1...
Note: The value of config.json is the base64-encoded ~/.docker/config.json file. You can get this data with the following command:
cat ~/.docker/config.json | base64 -w0
```

3. Use the following commands to apply secrets, tasks(git clone and kaniko) and pipeline with pipelinerun.
```bash 
kubectl apply -f docker-credentials.yaml
kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/git-clone/0.9/git-clone.yaml
kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/kaniko/0.6/kaniko.yaml
kubectl apply -f pipeline.yaml
kubectl create -f pipelinerun-frontend.yaml
```
NOTE: Last Command creates a PipelineRun with a unique name each time:
pipelinerun.tekton.dev/clone-build-push-run-4kgjr created

4. Command to check the logs.
```bash 
tkn pipelinerun logs clone-build-push-run-4kgjr -f
```
![Alt text](image.png)

5. Now go to DockerHub to verify. 
NOTE: Don't forgot to refresh the dockerhub repo page. 
![Alt text](image-1.png)

## Deliverables
Acceptance criteria for the task are as follows: 
* Image should be uploaded on dockerhub.

## Task: 02 Configure AgroCD
The task is to configure agroCD on your cluster.
## Steps
1. Create a namespace and apply manifest installation from github repo.
```bash 
kubectl create ns argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.5.8/manifests/install.yaml
```
2. Verify it and make sure all the pods are running before moving to next step.
```bash 
kubectl get all -n argocd
```
3. In order to access the web UI you have to do port forwarding.
```bash 
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
4. Admin will be the username, now use command to get the password and copy the password.
```bash 
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```
## Deliverables
Acceptance criteria for the task are as follows: 
* AgroCD will be configured.