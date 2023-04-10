import { useQuery } from "@tanstack/react-query"
import { supabase } from "./supabase"

export const useExperiments = () => {
    return useQuery({ queryKey: ['experiments'], queryFn: fetchExperiments })
}

export const useExperiment = (id) => {
    return useQuery({ queryKey: ['experiments', id], queryFn: () => fetchExperiment(id) })
}

export const createExperiment = async () => {
    const {data, error} = await supabase
        .from('Experiment')
        .insert({
            name: 'New Experiment',
            description: 'New Experiment'
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
        .from('Experiment')
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
    .from('Experiment')
    .select('id, name, description, createdAt: created_at')
    .order('created_at', { ascending: false })

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return { list: data, count }
}

const fetchExperiment = async (id) => {
    const { data, error } = await supabase
    .from('Experiment')
    .select('id, name, description, createdAt: created_at, results: Run(id, name: input_file, description, createdAt: created_at, scores: Score(id, type, value))')
    .eq('id', id)
    .order('created_at', { ascending: false })
    .maybeSingle()

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return data
}