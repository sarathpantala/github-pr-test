var Pull_request_Summary=process.argv[2];
var Pull_request_Commit_Message=process.argv[3];
var Pull_request_Long_Description=process.argv[4];
var regex = RegExp('^([Dd][Ee][Vv][Oo][Pp][Ss])|^([Dd][Oo][Pp][Ss])|^([Dd][Ee][Vv])|^([Ss][Rr][Ee])-[0-9]+');
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
git_long_description();
git_check_error();
