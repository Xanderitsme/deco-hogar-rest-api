// export const isFormattedDate = (string: string) => {
//   return /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/.test(string)
// }

export const isFormattedDate = (string: string) => {
  return /^(\d{4}[- /.]((0[13578]|1[02])[- /.](0[1-9]|[12][0-9]|3[01])|(0[469]|11)[- /.](0[1-9]|[12][0-9]|30)|02[- /.](0[1-9]|1\d|2[0-8]))|(\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00)[- /.]02[- /.]29)$/.test(string)
}
