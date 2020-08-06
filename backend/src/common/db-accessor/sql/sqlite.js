const sql = {
    CREATE_ASSIGNEE_TABLE: `CREATE TABLE IF NOT EXISTS ASSIGNEE(
                                ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                                NAME VARCHAR(50), 
                                SURNAME VARCHAR(50)
                            )`,
    CREATE_PROJECT_TABLE: `CREATE TABLE IF NOT EXISTS PROJECT(
                              ID INTEGER PRIMARY KEY AUTOINCREMENT,
                              NAME VARCHAR(50),
                              DESCR VARCHAR(100)
                          )`,
    CREATE_TASK_TABLE: `CREATE TABLE IF NOT EXISTS TASK(
                            ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                            PARENT INTEGER, 
                            PROJECT_ID INTEGER,
                            ASSIGNEE_ID INTEGER, 
                            STATUS_ID INTEGER, 
                            TITLE VARCHAR(50), 
                            DESCR VARCHAR(500),
                            FOREIGN KEY(PARENT) REFERENCES TASK(ID),
                            FOREIGN KEY(PROJECT_ID) REFERENCES PROJECT(ID),
                            FOREIGN KEY(ASSIGNEE_ID) REFERENCES ASSIGNEE(ID),
                            FOREIGN KEY(STATUS_ID) REFERENCES STATUS(ID)
                        )`,
    CREATE_TASK_STATUS_TABLE: `CREATE TABLE IF NOT EXISTS TASK_STATUS(
                                  ID INTEGER, 
                                  NAME VARCHAR(30), 
                                  DESCR VARCHAR(100)
                              )`,
    DELETE_TASK_STATUS_TABLE: `DELETE FROM TASK_STATUS`
};

module.exports = sql;
