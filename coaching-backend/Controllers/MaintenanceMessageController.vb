Imports System.Net
Imports System.Web.Http
Imports System.Web.Mvc

Public Class MaintenanceMessageController
    Inherits ApiController

    ' GET api/MaintenanceMessage?application=
    Public Function GetValue(ByVal application As String) As JsonResult
        Dim DatabaseConnector As New DatabaseConnector()
        Dim recordList As MaintenanceMessage = DatabaseConnector.LoadMaintenanceMessage(application)
        Return New JsonResult With {.Data = recordList}
    End Function
End Class
