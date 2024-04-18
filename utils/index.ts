export const dateFormat = (date: string): string => {
    const intl = new Intl.DateTimeFormat('zh-CN', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'Asia/Shanghai'
        }
    )
    return intl.format(new Date(date))
}
