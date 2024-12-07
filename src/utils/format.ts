const formatDate = (value: string): string => {
	const date = Intl.DateTimeFormat('en-GB', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
	})

	return value ? date.format(new Date(value)) : ''
}

const formatCurrency = (value: number, currency = 'USD'): string => {
	if (value || value === 0) {
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency,
		})
	
		return formatter.format(value)
	}
	else return ''
}

export { formatDate, formatCurrency }