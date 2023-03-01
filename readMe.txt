-CRUD Operations ON LOCAL ARRAY
-DTO file
-Entity File
-Interface File
-Built in Pipes
-Custom Pipes
-Enum feature is used when we have to choose limited states.


Additional Features#
-To prevent any blank value from being inserted in the field
-To restrict the user to only input the available 'TASK STATUS' when performing 'Get by Search and Status' operation. Available 'Task Status' are [DONE, OPEN, IN_PROGRESS]
-Make a custom pipe to only allow the valid 'Task Status' from the user.
-To throw exception/error if there is no match found for search by ID or deleting the item
-If user enters the Querry then 'getTaskWithFilter' will be called else the method 'getAllTask' will be called.


POST MAN API File attached      