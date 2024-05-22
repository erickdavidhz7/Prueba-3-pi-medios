const getMonthAndYearFromDate = (
  dateString: string
): { month: string; year: number } => {
  const parts = dateString.split('/')
  if (parts.length !== 3) {
    throw new Error(
      'Invalid date string format. It should be in MM/DD/YYYY format.'
    )
  }
  const monthNumber = parseInt(parts[0], 10)
  const year = parseInt(parts[2], 10)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  if (monthNumber <= 0 && monthNumber > 12)
    throw new Error('Invalid month number. It should be between 1 and 12.')

  if (year <= 0 && year > 2024)
    throw new Error('Invalid year number. It should be between 1 and 2024.')

  return {month: months[monthNumber - 1], year}
}

export default getMonthAndYearFromDate
