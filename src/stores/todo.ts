import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TodoStatuses, type ITodoItem, type ITodoFormData } from '@/interfaces'
import { v4 as uuidv4 } from 'uuid';

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<ITodoItem[]>([])
    const statusFilter = ref<TodoStatuses | null>(null)
    const bulkMode = ref<boolean>(false)
    const bulkUuids = ref<string[]>([])

    const getList = () : ITodoItem[] => {
        let result = todos.value.sort((a, b) => a.status - b.status)
        if(statusFilter.value !== null) result = result.filter(item => item.status === statusFilter.value)
        return result
    } 

    const add = (formData : ITodoFormData) => {
        validate(formData)
        todos.value.push({
            uuid : uuidv4(),
            order: getLastItemOrder(),
            title : formData.title!,
            description : formData.description,
            status : TodoStatuses.pending
        })
        writeToLocalStorage()
    }

    const update = (uuid : string, formData : ITodoFormData) => {
        const item = todos.value.find(item => item.uuid === uuid)
        if(item) {
            Object.assign(item, formData)
        }
        writeToLocalStorage()
    }

    const remove = (uuid : string) => {
        const itemIndex = todos.value.findIndex(item => item.uuid === uuid)

        if(itemIndex !== -1) {
            todos.value.splice(itemIndex, 1)
        }
        writeToLocalStorage()
    }

    const toggleStatus = (uuid : string) => {
        const item = todos.value.find(item => item.uuid === uuid)
        if(item) {
            item.status === TodoStatuses.pending ? item.status = TodoStatuses.completed : item.status = TodoStatuses.pending
        }
        writeToLocalStorage()
    }

    const select = (uuid : string) => {
        bulkUuids.value.push(uuid)
    }

    const deselect = (uuid : string) => {
        const itemIndex = bulkUuids.value.findIndex(item => item === uuid)
        if(itemIndex !== -1) {
            bulkUuids.value.splice(itemIndex, 1)
        }
    }

    const deleteSelected = () => {
        bulkUuids.value.forEach(uuid => {
            const itemIndex = todos.value.findIndex(item => item.uuid === uuid)
            if(itemIndex !== -1) {
                todos.value.splice(itemIndex, 1)
            }
        })
        writeToLocalStorage()
    }

    const readFromLocalStorage = () => {
        if(localStorage.todos) {
            todos.value = JSON.parse(localStorage.todos)
        }
    }

    const writeToLocalStorage = () => {
        localStorage.todos = JSON.stringify(todos.value)
    }

    const getLastItemOrder = () : number => {
        if(todos.value.length !== 0) {
            return todos.value[todos.value.length - 1].order + 10
        } else {
            return 0
        }
    }

    const validate = (formData : ITodoFormData) => {
        if(!formData.title) {
            throw new Error("Поле название должно быть обязательным!")
        }
    } 

    return {
        todos,
        statusFilter,
        bulkMode,
        bulkUuids,
        getList,
        add,
        update,
        remove,
        toggleStatus,
        select,
        deselect,
        deleteSelected,
        readFromLocalStorage,
        writeToLocalStorage
    }
})