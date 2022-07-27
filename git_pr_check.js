var Pull_request_Summary=process.argv[2];
var Pull_request_Commit_Message=process.argv[3];
var Pull_request_Long_Description=process.argv[4];
var regex = RegExp('^([Dd][Ee][Vv][Oo][Pp][Ss])|^([Dd][Oo][Pp][Ss])|^([Dd][Ee][Vv])|^([Ss][Rr][Ee])-[0-9]+');
var check,checkarray=[];
git_summary_devops = function() {
    //Check1: Summary Line should start with JIRA Number Format(ex: devops-160, sre-1234, dops-1224, dev-1234)
     if (regex.test(Pull_request_Summary).toString() == "true"){
          console.log("Success: Summary Line starts with JIRA Number Format ex: (ex: devops-160, sre-1234, dops-1224, dev-1234)");
      } else {
          console.log("Error: Summary Line should start with JIRA Number Format ex: (ex: devops-160, sre-1234, dops-1224, dev-1234)");
          check="true";
          checkarray.push(check);
     }
};

git_summary_length = function() {
	//Check2: Summary Line should be less than or equal to 30 characters
    if (Pull_request_Summary.length < 30)
    {
        console.log("Success: Summary_Line is less than max character length size");
    }else {
      console.log("Error: Summary_Line had exceeded max 30 characters of length");
      check="true";
      checkarray.push(check);
    }
};

git_long_description = function() {
    Pull_request_Long_Description = Pull_request_Long_Description.toString();
     //Check3: Long Description should be more than 100 characters
    if (Pull_request_Long_Description.length > 100) {
        console.log("Success: Long Description is more than min 100 character length");
    }
    else {
      console.log("Error: Long Description is less than min 100 characters of length");
      check="true";
      checkarray.push(check);
    }
};
git_check_error = function() {
	//Check4: check if encountered any error status
    if(checkarray.indexOf('true') > -1)
    {
        console.log("Status check errors present");
        process.exit(1);
    }else{
        console.log("No status check errors");
    }
};

git_summary_devops();
git_summary_length();
git_long_description();
git_check_error();
