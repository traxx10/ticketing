`
  WHY DOCKER
    1) It makes it easy to run different programs.

  KUBERNETES
    1) It is a tool for running a bunch of different containers
    2) we give it some configuration to describe how we want our containers to run and interact with each other.

    CLUSTER
      1) A cluster is a set of different virtual machines, these virtual machines are called nodes.

    KUBERNETES WORK FLOW
      1) Create a config file
      2) Creates a POD/NODE according to the config file 
      3) Creates a deployment
      4) Creates a SERVICE to tell the containers how to interact and communicate with eah other.

      TERMINOLOGIES
        CLUSTER: it is a collection of NODES and a MASTER to manage them.
        NODE: It is a virtual machine that will run our containers.
        POD: More or Less a running container.  Technically, a pod can run multiple containers(not in this course)
        DEPLOYMENT: Monitors a set of pods, make sure they are running and restarts them if they crash.
        Service: Provides an easy-to-remember URL to access a running container.

      WHAT DOES THE CONFIG FILE DO?
        1) It tells kurbenete about the different deployments, pods and services (referred to as Objects) that we want to create.
        2) it is written in YAML syntax
        3) We always store these files with out project source code - they are documentations.
        4) We can create Objects without config files (DO NOT DO THIS). Config files provide a precise definition of what your cluster is running.

      CONFIG FILE DESCRIPTION
        apiVersion: v1 - k8s is extensible - we can add in our own custom objects. This specifies the set of objects we want k8s to look at.
        kind: Pod - The type of object we want to create
        metadata: Config options for the object we are about to create.
          name: posts - When the pod is created, give it a name of 'posts'
        spec: The exact attributes we want to apply the object(pod) we are abut to create
          containers: we can create many containers in a single pod
            -name:posts : Make a container with the name of posts
            image: The exact image we want to use


        K8S WORLD
          kubectl apply -f [config filename] - Tells Kub to process the config.
          kubectl - Print out information about all the running pods.
          kubectl exec -it [pod_name] [cmd] - Execute the given command in a running pod.
          kubectl logs [pod_name] - Print out logs from the given pod
          kubectl delete pod [pod_name] - Deletes pod
          kubectl describe pod [pod_name] - Prints out some information about the runnng pod
          kubectl rollout restart deployment posts-depl
          kubectl apply -f . - For applying multiple deployments
      
      UPDATING THE IMAGE USED BY DEPLOYMENT - Method #2
        1. The Deployment must be using the 'latest' tag in the pod spec section.
        2. Make an update to your code.
        3. Build the image.
        4. Push the image to docker hub
        5. Run the command *KUBETCL rollout restart deployment [depl_name]*
      
      SERVICES
        A service is an object for setting up communication between pods.

        TYPES OF SERVICES
          a) Cluster IP: It Setups up an easy to remember URL to access a pod. It only exposes pods in the CLUSTER.
          b) Node Port: Makes a pod accessible from outside the cluster usually only used for dev purposes.
          c) Load Balancer: Makes a pod accessible from outside the cluster. This is the right way to expose a pod to the outside world.
          d) Redirects an in-cluster request to a CNAME url....


          SERVICE CONFIG FILE
            a) targetPort - It is the port attached to the container and where our application is listening traffic on.
            b) port - It is the port that gets attached to the nodeport service itself
            c) nodeport - It is the port that we actually use to get acccess from outside world to our cluster

          SECTION 4 - VIDEO 25
        
          LOAD BALANCER SERVICE
            It tells our kubernetes cluster to reach out to its provider(google, azure) and provision a load balancer and 
            Gets traffic in a single pod.

          INGRESS OR INGRESS CONTROLLER
            Its a Pod that with a set of routing rules to distribute traffic to other services inside of our cluster.

      YAML FILE DESCIPTIONS

        DEPLOYMENTS
          1. template is the label that gets applied to the pod
          2. selector is how the deployment is going to find all the pods that it actually creates
          3. Replica is the number of pods that we want to create.

        SERVICES
          1. selector tells the service which pod it should govern access to.

          YAML FILE
              a) annotations - Its what helps ingress controller understand that we are trying to feed it some routing rules.
        

`;
