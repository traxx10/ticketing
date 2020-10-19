`
  ERROR In CHROME BROWSER:
    Type in *thisisunsafe*

  AUTHENTICATION
    a) Fundamental Option #1 -
        Individual services rely on the auth service.
          CONS: We are strictly relying on the auth service and if the auth service is down, the whole of our application would be down.
          PROS: Changes to auth state are immediately reflected.

    b) Fundamental Option #1.1 -
        Individual services rely on the auth service as a gateway.
            CONS: We are strictly relying on the auth service and if the auth service is down, the whole of our application would be down.
            PROS: Changes to auth state are immediately reflected.

    c) Fundamental Option #2 -
        Individual services know how to authenticate a user.
          CONS: Opposite of option #1
          PROS: Opposite of option #1

    COOKIES VS JWT

      COOKIES
        a) It is a transport mechanism.
        b) Moves any kind of data between browser and server.
        c) Automatically mnagaed by the browser.
    
      JWT
        a) Authentication/Authorization mechanism.
        b) Stores any data we want.
        c) We have to manage it manually.

    REQUIREMENTS FOR AUTH MECHANISM (JWT)
      a) Must be able to tell us details about a user.
      b) Must be able to handle authorization info.
      c) Must have a built in, tamper-rsistant way to expire or invalidate itself.
      d) Must be easily understood between different languages.
      e) Must not require some kind of backing data store on server.

    SECRET
      a) A secret is an object in Kubernetes for storing objects securely in our cluster.

        CREATING A SECRET
          a) kubectl create secret *generic* *jwt-secret* --from-literal=*JWT_SECRET=asdf*
             kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=asdf

            i) generic - It is a type of secret that is all purpose
            ii) jwt-secret - it is the name of the secret and it is used for loggin purposes. Same way we create names for deployments.
            iii) jwt=asdf - Name and value pair of the secret we are trying to create.
            
        IMPERATIVE command is when we run a command to directly create an object
        DECLRATIVE command is when we use a config file to create a secret.

  AUTOMATED - TESTING
    SCOPES OF TESTS
      a) Test a single piece of code in isolation (Unit Testing) EG Single Middleware.
      b) Test how different pieces of code work together EG Request flowing through multiple middlewares to a request handler.
      c) Test how different components work together. EG Make request to services, ensure write to database was complete.
      d) Test how different services work together. EG Creating a payment at the payments services should affect the orders service.

    TESTING GOALS
      a) Basic request handling.
      b) Some tests around models.
      c) Event emitting + receiving.

    HOW WILL WE RUN AND EXECUTE TESTS
      a) We are going to run these tests directly from our terminal without using docker.
      b) This implies that our local environemnts is capable of running each service!.
      c) Simple enough now but more complex projects might make this hard.
    
    TESTING ARCHITECTURE
      a) Jest would be used to execute test
          JEST would do the following.
            i) Start in-memory copy of MongoDB
            ii) Start up express app
            iii) Use SUPERTEST library to make fake requests to our express app.
            iv) Run assertions to make sure requests did the right thing.

    SERVER SIDE RENDERING -
      WHAT NEXT JS DOES BEHIND THE SCENE.
        a) Inspect URL of incoming request and determine which component to show.
        b) Call those components 'getInitialProps' static method.
        c) Render each component with data from 'getInitialProps' one time.
        d) Assemble HTML from all components, send back response.

      NAMESPACE
        a) All objects are created under a specific namespace.
        b) Crossing accessing a domain from a different namespace is 
          "name of the service.name of the namespace.svc.cluster.local"
          "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
          "k get services -n ingress-nginx" - Used for getting the services in a namespace.
        c) External Name Service re maps the name of the domain.

      REQUEST FROM A COMPONENT
        a) Always issued from within the browser so we use a domain of "".
      
      REQUEST FROM GETINITIALPROPS
        a) Might be executed from the client or the server!. Need to figure out what our env is so we can use the correct domain.

      WHEN CAN GETINITIAL ON THE SERVER
        a) Hard refresh of page.
        b) Clicking link from different domain.
        c) Typing URL into the address bar.

      WHEN CAN GETINITIAL ON THE BROWSER
        a) Navigating from one page to another while in the app. 

      ISSUES WITH GETINITIALPROPS 
        a) Page Arguments passed to the function is different from app component.
        b) Adding a getInitialProps to a custom component makes getInitialProps on pages not work.

    SHARED LIBRARY AND CODE REUSE.
      METHOD OF CODE SHARING BETWEEN SERVICES
        a) Direct Copy Paste
        b) Git Submodule - A Submodule is when we have a git repo within another github repo.
        c) NPM Package - Publish the code as an npm repo. 

      PACKAGE SECURITY
        a) We can publish an npm package as a public Registry in an organisation.
        b) We can publish an npm package as a private Registry in an organisation.

        "npm publish --access public" - To Publish a git repo
        "npm version patch" - Update npm version patch number
        "npm update repoName" - Update repo

    NATS Streaming Server
      a) NATS and NATS Streaming Server are two different things.
      b) NATS Streaming implements some extraordinarily important design decisions that will affect our app.
      c) We are going to run the official 'nats-streaming' docker image in kurbenets.
      d) NATS Streaming requires us to subscribe to channels. Events are emitted to specific channels.
      e) NATS Streaming stores all events in memory by default but can be configured to be saved in a db or flatfiles.
      
      PORT FORWARDING - k port-forward nats-depl-7698fd5f47-r6khv 4222:4222

      a) SUBJECT - It is the name of the channel that we want to publish information to.
      b) CHANNEL - It is something that we listen to.
      c) SUBSCRIPTION - It listens to the channel and listen to the data.
      d) QUEUE GROUPS - They are something associated to a channel. It helps limiting the number of times we send an event or message to members of
            a queue group.

      NATS SUBSCRIPTION OPTIONS
        a) setManualAckMode - Sets the manual acknowledge mode to true to tell nats that we would manually ack our events.

    NATS DEPL FILE TERMINOLOGY AND NATS HEALTH CHECK
      http://localhost:8222/streaming/channelsz?subs=1 - For opening nats server.
      
      a) hb - It stands for heartbeat, it is a little request that nats is going to send to its clients every so seconds. its is a health check.
      b) hbi - It is how OFTEN nats is going to make a request to its clients.
      b) hbt - It is how LONG each client has to respond.
      c) hbf - It is the number of times that each request is going to fail before nats server can decide that each client has failed and won't 
          be coming up.

    CORE CURRENCY ISSUE DISCUSSION - Folder 14, Video 16

    SOLVING DATABASE AND EVENT FAILING ISSUE
      We can solve this by creating a separate database and saving both the events and the other resource to a collection and manage
      the scenario where it fails by using database transaction.

      DATABASE TRANSACTION - It is allows us to make some changes on our database if some process or other processes fail.

      THREE OPTIONS THAT MAKE NATS WORK WELL.
        QUEUE GROUP - Makes sure we dont accidentally dump all the emitted events if the service goes offline and also make sure 
                      that all emitted events go only to one instance of all the listeners.
        DURABLE SUBSCRIPTION - is to keep track of all the different events that has been processed and gone to the queue group.
        SET DELIVER ALL AVAILABLE - Makes sure that when a service comes back online that the events are re delivered. 


    MOCKING(FAKING) IMPORTS WITH JEST
      a) Find the file that we want to mock
      b) In the same directory, create a folder called '__mocks__'
      c) In that folder, create a file with an identical name to the file we want to fake
      d) Write a fake implementation
      e) Tell jest to use that fake file in our test file.

    OPTIMISTIC CONCURRENCY CONTROL

    BULL JS
      JOB - It is a plain javascript object, it describes some amount of processing to be done on a file.
      QUEUE - It is a represents some series of jobs(messages) that we want to queue up and eventually process over time.

    WORK FLOW & DEPLOYMENT - 
      a) Make change to code for a service
      b) Commit code to a git branch(asides master branch)
      c) Push code to github

        - GITHUB
      d) Github receieves updated branch
      e) You manually creaye a PR to merge branch into master
      f) Github automatically runs tests for project
      g) After tests pass, you merge the PR into master branch
      h) Because master branch has changed, github builds and deploys.

      GITHUB ACTIONS
        - on: When we want to run this workflow
        - ci: It makes sure that after a test is completed, it exits automatically

      

`;
