class RouteList{

    BASE = "http://localhost:8080"

    TaskRoute = this.BASE +"/api/Tasks/"

    GetTaskRoute = this.TaskRoute + "status/"

    AdminRoute = this.BASE + '/api/Admin/'
}


const ApiList = new RouteList()

export default ApiList