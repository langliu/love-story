export default defineAppConfig({
    ui: {
        notifications: {
            // Show toasts at the top right of the screen
            position: 'top-0 bottom-auto'
        },
        table: {
            default: {
                emptyState: {
                    label: '暂无数据',
                    icon: 'i-heroicons-circle-stack-20-solid',
                },
                loadingState: {
                    label: '加载中...'
                }
            }
        }
    }
})
