import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApiSlice=createApi({
    reducerPath:'booksApi',
    baseQuery:fetchBaseQuery({
        baseUrl:"https://taskmanager-api-updated.onrender.com",
    }),
    endpoints:(builder)=>({
        getProjects: builder.query({
            query: () => "/projects",
            
        }),
        getTeam: builder.query({
            query: () => "/team",

        }),
        getTasks: builder.query({
            query: () => "/tasks",
        }),
        addTasks: builder.mutation({
            query: (data) => ({
                url: "/tasks",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: addNewProjects } = await queryFulfilled;
                  dispatch(
                    taskApiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        draft?.push(addNewProjects)
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),
        deleteTasks: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  await queryFulfilled;
                  dispatch(
                    taskApiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        return draft?.filter((projects)=>projects?.id!==args)
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),

        editStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: {
                    status:status,
                },
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: updatedStatus } = await queryFulfilled;
                  dispatch(
                    taskApiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        let singleProject=draft?.find((item)=>item.id.toString()===args?.id.toString())
                        singleProject.status=updatedStatus?.status;
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),
        
        editTasks: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: updatedProjects } = await queryFulfilled;
                  dispatch(
                    taskApiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        let singleProject=draft?.find((item)=>item.id.toString()===args?.id.toString())
                        singleProject.taskName=updatedProjects?.taskName;
                        singleProject.teamMember.name=updatedProjects?.teamMember.name;
                        singleProject.project.projectName=updatedProjects?.project.projectName;
                        singleProject.deadline=updatedProjects?.deadline;
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),
    })
})

export const {useGetProjectsQuery,useGetTasksQuery,useGetTeamQuery,useAddTasksMutation,useDeleteTasksMutation,useEditStatusMutation,useEditTasksMutation}=taskApiSlice;