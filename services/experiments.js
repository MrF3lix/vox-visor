import { useQuery } from "@tanstack/react-query"
import { supabase } from "./supabase"
import { getUserId } from "./auth"

export const useExperiments = () => {
    return useQuery({ queryKey: ['experiments'], queryFn: fetchExperiments })
}

export const useExperiment = (id) => {
    return useQuery({ queryKey: ['experiments', id], queryFn: () => fetchExperiment(id) })
}

export const useExperimentResults = (id) => {
    return useQuery({ queryKey: ['experiments', 'results', id], queryFn: () => fetchExperimentResults(id) })
}

export const createExperiment = async () => {
    const userId = await getUserId()
    const {data, error} = await supabase
        .from('experiment')
        .insert({
            name: 'New Experiment',
            description: 'New Experiment',
            user_id: userId
        })

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return data
}

export const saveExperiment = async (result) => {
    const {data, error} = await supabase
        .from('experiment')
        .update({
            name: result.name,
            description: result.description
        })
        .match({ id: result.id });

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return data
}

const fetchExperiments = async () => {
    const { data, error, count } = await supabase
    .from('experiment')
    .select('id, name, description, createdAt: created_at')
    .order('name')

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return { list: data, count }
}

const fetchExperiment = async (id) => {
    const { data, error } = await supabase
    .from('experiment')
    .select('id, name, description, createdAt: created_at, runs: run(id, createdAt: created_at, name, description)')
    .eq('id', id)
    .order('created_at', { ascending: false })
    .maybeSingle()

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }
    
    console.log(data)

    // const runs = await fetchExperimentResults(id)

    return {
        ...data
    }
}

const fetchExperimentStats = async (id) => {
    const {data} = await supabase.rpc('get_experiment_stats', { experiment_id: id })
    return data[0]
}

const fetchExperimentResults = async (id,page=0) => {
    const { data, error } = await supabase.rpc('get_runs', { experiment_id: id, offset_n: page*1000 })
    return data
}