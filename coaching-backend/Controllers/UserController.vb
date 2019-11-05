Imports System.Net
Imports System.Web.Http

Namespace Controllers
    Public Class UserController
        Inherits ApiController

        ' GET: api/User
        Public Function GetValues() As IEnumerable(Of String)
            Return New String() {"value1", "value2"}
        End Function

        ' POST: api/User
        Public Function PostValue(<FromBody()> ByVal userToLogIn As User) As JsonResult
            Dim DatabaseConnector As New DatabaseConnector()

            Dim ThisUser As User = DatabaseConnector.GetUserInfoLDAP(userToLogIn)
            If IsNothing(ThisUser) Then
                Return Nothing
            End If

            Return New JsonResult With {.Data = ThisUser}
        End Function

        ' PUT: api/User/5
        Public Sub PutValue(ByVal id As Integer, <FromBody()> ByVal value As String)

        End Sub

        ' DELETE: api/User/5
        Public Sub DeleteValue(ByVal id As Integer)

        End Sub
    End Class
End Namespace