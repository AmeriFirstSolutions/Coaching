Imports System.Net
Imports System.Web.Http

Namespace Controllers
    Public Class EmployeeController
        Inherits ApiController

        ' GET: api/Employee
        Public Function GetValues() As IEnumerable(Of String)
            Return New String() {"value1", "value2"}
        End Function

        ' GET: api/Employee/5
        Public Function GetValue(ByVal userTeam As String) As String
            Dim DatabaseConnector As New DatabaseConnector()
            Dim employeeList As String = DatabaseConnector.GetEmployees(userTeam)
            Return employeeList
        End Function

        ' POST: api/Employee
        Public Sub PostValue(<FromBody()> ByVal value As String)

        End Sub

        ' PUT: api/Employee/5
        Public Sub PutValue(ByVal id As Integer, <FromBody()> ByVal value As String)

        End Sub

        ' DELETE: api/Employee/5
        Public Sub DeleteValue(ByVal id As Integer)

        End Sub
    End Class
End Namespace