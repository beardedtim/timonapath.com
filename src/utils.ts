/**
 * Checks if the given string is of the correct shape of an email.
 * Does not check if the email can accept mail
 *
 * @param str the string to check if it is an email or not
 * @returns boolean
 */
export const isEmail = (str: string) => {
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )

  return !!str.match(regexp)
}
