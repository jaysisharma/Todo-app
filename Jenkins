pipeline {
    agent any

    stages {
        stage('Code') {
            steps {
                git branch: 'main', credentialsId: 'jenkins', url: 'https://github.com/jaysisharma/Todo-app.git'
                echo 'Clone Successful'
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t todo-app ."
                echo 'Code Build Successful'
            }
        }
        stage('Push to Repository') {
            steps {
                withCredentials([usernamePassword(credentialsId:"dockerhub",passwordVariable:"dockerPass",
                usernameVariable:"dockerUser")]){
                    sh "docker login -u ${env.dockerUser} -p ${env.dockerPass}"
                    sh "docker tag todo-app:latest ${env.dockerUser}/todo-app:latest"
                    sh "docker push ${env.dockerUser}/todo-app:latest"
                    echo "Docker Image Pushed Successfully"
                }
            }
        }
        stage('deploy') {
            steps {
                sh "docker-compose up -d"
                echo "Todo app deployed successfully"
            }
        }
    }
}
