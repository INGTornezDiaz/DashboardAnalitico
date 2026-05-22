export function useExport() {
  const exportCSV = (data, filename = 'export') => {
    if (!data || !data.labels) return

    const rows = [['Periodo', ...Object.keys(data).filter(k => k !== 'labels')]]
    data.labels.forEach((label, i) => {
      const row = [label, ...Object.keys(data).filter(k => k !== 'labels').map(k => data[k][i])]
      rows.push(row)
    })

    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportJSON = (data, filename = 'export') => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return { exportCSV, exportJSON }
}
