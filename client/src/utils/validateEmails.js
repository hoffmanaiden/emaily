// regex from emailregex.com
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  const invalidEmails = emails
    .split(',') // split string into array where there is a comma
    .map(email => email.trim()) // trim white space off of each email
    .filter(email => !regex.test(email)) // keep emails that do NOT pass the regex test

  // this allows a comma to end the string of invalidEmails
  // without producing an error
  // Edit: this may keep the comma on the end of the last email
  // const emailArray = invalidEmails.filter(email => {
  //   if(email.length > 0){
  //     return email;
  //   }
  //   return null;
  // });
  // Edit: to revert, uncomment and replace the two
  // instances of 'invalidEmails' below with 'emailArray'

  // if there are invalid emails, return this \/
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`
  }

  // if everything is good, just return
  return;
};