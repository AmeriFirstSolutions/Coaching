Imports System.Net
Imports System.Web.Http
Namespace Controllers
    Public Class EmployeeController
        Inherits ApiController
        Public Function GetValue(ByVal userTeam As String) As String
            Dim DatabaseConnector As New DatabaseConnector()
            Dim employeeList As String = DatabaseConnector.GetEmployees(userTeam)
            Return employeeList
        End Function
    End Class
End Namespace