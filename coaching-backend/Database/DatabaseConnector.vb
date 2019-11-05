Imports System.Data.SqlClient
Imports System.DirectoryServices
Imports System.IO
Imports System.Web.Configuration

Public Class DatabaseConnector

    Private DBConnection As SqlConnection
    Private applicationCode = "CD"

    Public Function GetSqlConnectionState() As ConnectionState
        Return DBConnection.State
    End Function

    Public Function GetConnectionString() As String
#If DEBUG Then
        Dim ConnectionString As String = WebConfigurationManager.ConnectionStrings("TestCoachingConnectionString").ConnectionString
#Else
        Dim ConnectionString As String = WebConfigurationManager.ConnectionStrings("CoachingConnectionString").ConnectionString
#End If
        Return ConnectionString
    End Function

    Friend Function GetUserInfoLDAP(thisUser As User) As User

        Dim curUser = New User()
        Dim test = Nothing

        Try
            If AuthenticateUser("LDAP://OU=AMERIFIRST Users,DC=amerifirst,DC=local", thisUser.UserName, thisUser.UserPassword) Then


                If (thisUser.UserName <> Nothing) Then
                    curUser.UserName = thisUser.UserName
                    test = logLoginAction(thisUser, "True", "CD")
                Else
                    curUser.UserName = ""
                    test = logLoginAction(thisUser, "False", "CD")
                End If

            Else
                curUser.UserName = ""
                test = logLoginAction(thisUser, "False", "CD")
            End If
        Catch ex As Exception
            curUser.UserName = ""
            test = logLoginAction(thisUser, "False", "CD")
            logQuery("Error on LDAP Login", "Failure", thisUser.UserName, ex.Message, ex.Source, ex.StackTrace, ex.TargetSite.ToString())
        End Try

        Return curUser

    End Function

    Private Function logLoginAction(thisUser As User, attemptResult As String, app As String)
        DBConnection = New SqlConnection(GetConnectionString())
        Dim ReturningLookupQueryString As String = "INSERT INTO [dbo].[SYS_LoginAttempt]  ([Username]  ,[Success]  ,[EnterDate]  ,[EnterBy]   ,[Application]) VALUES  ('" + CleanString(thisUser.UserName) + "'  ,'" + attemptResult + "'  ,Getdate()  , '" + app + ": Backend'   , '" + app + "')"

        Dim SelectCommand As New SqlCommand(ReturningLookupQueryString, DBConnection)
        DBConnection.Open()
        Dim RecordResult As New OperationResult
        Dim rowNumber = 0

        Try
            Using Reader = SelectCommand.ExecuteReader()
                RecordResult.ResultStatus = "Success"
                logQuery(ReturningLookupQueryString, "Success", thisUser.UserName, "", "", "", "")
            End Using
        Catch ex As Exception
            Dim RecordListError As New OperationResult
            RecordListError.ResultStatus = "Error"
            logQuery(ReturningLookupQueryString, "Failure", thisUser.UserName, ex.Message, ex.Source, ex.StackTrace, ex.TargetSite.ToString())
            Return RecordListError
        Finally

        End Try

        DBConnection.Close()
        Return RecordResult
    End Function

    Function AuthenticateUser(path As String, user As String, pass As String) As Boolean
        Dim de As New DirectoryEntry(path, user, pass, AuthenticationTypes.Secure)
        Try
            'run a search using those credentials.  
            'If it returns anything, then you're authenticated
            Dim ds As DirectorySearcher = New DirectorySearcher(de)
            ds.FindOne()
            Return True
        Catch
            'otherwise, it will crash out so return false
            Return False
        End Try
    End Function


    Public Function LoadMaintenanceMessage(searchString As String) As MaintenanceMessage
        DBConnection = New SqlConnection(GetConnectionString())
        Dim ReturningLookupQueryString As String = "Select * from SYS_MaintenanceMessage where Active = 'True' and ([Application] = '" + searchString + "' or [Application] = 'All') and StartDate <= Getdate() and EndDate >= Getdate() order by StartDate"


        Dim SelectCommand As New SqlCommand(ReturningLookupQueryString, DBConnection)
        DBConnection.Open()
        Dim RecordList As New MaintenanceMessage
        Dim rowNumber = 0

        Try
            Using Reader = SelectCommand.ExecuteReader()

                'Dim Record = New MaintenanceMessage()
                If Reader.HasRows Then
                    Reader.Read()
                    RecordList.MessagePID = Reader.Item("MessagePID").ToString()
                    RecordList.MessageText = Reader.Item("MessageText").ToString()
                    RecordList.Application = Reader.Item("Application").ToString()
                    RecordList.StartDate = Reader.Item("StartDate").ToString()
                    RecordList.EndDate = Reader.Item("EndDate").ToString()
                    RecordList.EnterDate = Reader.Item("EnterDate").ToString()
                    RecordList.EnterBy = Reader.Item("EnterBy").ToString()
                    RecordList.Active = Reader.Item("Active").ToString()

                End If
            End Using
        Catch ex As Exception
            Dim RecordListError As New MaintenanceMessage
            Return RecordListError
        Finally

        End Try

        DBConnection.Close()

        Return RecordList
    End Function


    Friend Sub logQuery(querystring As String, successFailure As String, username As String, errorMessage As String, errorSource As String, errorStackTrace As String, errorTargetSite As String)
        ''Dim strFile As String = "C:\Users\leverts\Desktop\Logs\CM\QueryLog_" & DateTime.Today.ToString("yyyy-MM-dd") & ".txt"
        Dim strFile As String = "D:\WebSite_Upload\Logs\CD\QueryLog_" & DateTime.Today.ToString("yyyy-MM-dd") & ".txt"
        Dim sw As StreamWriter
        Dim recordWritten As Boolean = False
        Dim failures As Int16 = 0

        Dim result As Double
        result = DateDiff("s", CDate("1970-1-1 12:00:00 AM"), Now)
        Dim tempStr As String
        tempStr = Strings.Format$(Now, "yyyy-MM-dd HH:mm:ss.SSS")
        Dim strTime() As String
        strTime = Strings.Split(tempStr, ".") ' Last element is millisecond
        result = result * 1000 + Val(strTime(UBound(strTime)))

        result = (DateTime.Now - New DateTime(1970, 1, 1)).TotalMilliseconds

        Dim NowUTCmsSince19700101 = result

#If DEBUG Then
        strFile = "\\afc-app03\website_upload$\Logs\CD\QueryLog_" & DateTime.Today.ToString("yyyy-MM-dd") & ".txt"
#End If

        Do While recordWritten.Equals(False) And failures <= 100

            Try
                If (Not File.Exists(strFile)) Then
                    sw = File.CreateText(strFile)
                    sw.WriteLine("Start Error Log for today")
                Else
                    sw = File.AppendText(strFile)
                End If
                sw.WriteLine(DateTime.Now & Delimeter() & username & Delimeter() & successFailure & Delimeter() & querystring & Delimeter() & errorSource & Delimeter() & errorStackTrace & Delimeter() & errorTargetSite & Delimeter() & failures.ToString() & Delimeter() & NowUTCmsSince19700101.ToString())
                sw.Close()
                recordWritten = True
            Catch ex As Exception
                'Console.Write(ex.Message)
                failures = failures + 1
                'MsgBox("Error writing to log file.")
            End Try

        Loop

        recordWritten = True

    End Sub

    Private Function CleanString(v As String) As String
        ' Intended to prevent Injection attack
        If (v <> Nothing) Then
            Return v.Replace("'", "''")
        Else
            Return ""
        End If
    End Function

    Private Function Delimeter()
        Return ":;:"
    End Function
End Class

