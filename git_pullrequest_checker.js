var Pull_request_Summary=process.argv[2];
var Pull_request_Description=process.argv[3];
var Pull_request_Commit_Message=process.argv[4];
var Pull_request_Long_Description=process.argv[5];
var regex = RegExp('^([Dd][Ee][Vv][Oo][Pp][Ss])|^([Ss][Rr][Ee])-[0-9]+');
var check,checkarray=[];
git_summary_devops = function() {
    //Check1: Summary Line should start with JIRA Number Format(ex: devops-160, sre-1234)
     if (regex.test(Pull_request_Summary).toString() == "true"){
          console.log("Success: Summary_Line starts with JIRA Number Format ex: (devops-123, sre-1234)");
      } else {
          console.log("Error: Summary_Line should start with JIRA Number Format ex: (devops-123, sre-1234)");
          check="true";
          checkarray.push(check);
     }
};

git_summary_length = function() {
	//Check2: Summary Line should be less than or equal to 50 characters
    if (Pull_request_Summary.length < 50)
    {
        console.log("Success: Summary_Line is less than max character length size");
    }else {
      console.log("Error: Summary_Line had exceeded max 50 characters of length");
      check="true";
      checkarray.push(check);
    }
};

git_description_length = function() {
	//Check3: Each line in description should be less than or equal to 72 characters
    var str=Pull_request_Description.replace(/(?:\\[rn])+/g, ",");
    var arr = str.split(',');
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i].length < 72)
        {
            console.log("Success: Descrition_Line_No:"+i+" is less than max character length");
        }else {
            console.log("Error: Descrition_Line_No:"+i+" had exceeded max 72 characters of length");
            check="true";
            checkarray.push(check);
        }
    }
};

/*git_commit_message = function() {
	//Check4: Commit Message should start with JIRA Number Format(ex: devops-160)
    var commit_msg = "Merge branch 'master' into ";
    if(Pull_request_Commit_Message.startsWith(commit_msg).toString() == "true")
    {
        console.log("Success: Commit_Message starts with 'Merge branch master into ' skipping commit constraint");
    }
    else
    {
         if (regex.test(Pull_request_Commit_Message).toString() == "true"){
              console.log("Success: Commit_Message starts with JIRA Number Format ex: (devops-123)");
          } else {
              console.log("Error: Commit_Message should start with JIRA Number Format ex: (devops-123)");
              check="true";
              checkarray.push(check);
          }
    }
};*/

git_check_error = function() {
	//Check5: check if encountered any error status
    if(checkarray.indexOf('true') > -1)
    {
        console.log("Status check errors present");
        process.exit(1);
    }else{
        console.log("No status check errors");
    }
};

git_long_description = function() {
    Pull_request_Long_Description = Pull_request_Long_Description.toString();
     //Check6: Long Description should be more than 150 characters
    if (Pull_request_Long_Description.length > 150) {
        console.log("Success: Long Description is more than min 150 character length");
    }
    else {
      console.log("Error: Long Description is less than min 150 characters of length");
      check="true";
      checkarray.push(check);
    }
};

git_summary_devops();
git_summary_length();
git_description_length();
//git_commit_message();
git_long_description();
git_check_error();
/*
Note:
1.Summary line should start with JIRA Number Format ex: (devops-123, SRE-1234) and line should be less than 50 characters.
2.Should have a well thought out and meaningful description lines and each line in the description should be less than 72 characters.
*/
