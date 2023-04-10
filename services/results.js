import { useQuery } from "@tanstack/react-query"
import { supabase } from "./supabase"

export const useResults = () => {
    return useQuery({ queryKey: ['results'], queryFn: fetchResults })
}

export const useResult = (id) => {
    return useQuery({ queryKey: ['results', id], queryFn: () => fetchResult(id) })
}

export const saveResult = async (result) => {
    const {data, error} = await supabase
        .from('Run')
        .update({
            input_file: result.name,
            description: result.description,
            experiment: result.experimentId === -1 ? undefined : result.experimentId
        })
        .match({ id: result.id });

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return data
}

const fetchResults = async () => {
    const { data, error, count } = await supabase
        .from('Run')
        .select('id, name: input_file, description, createdAt: created_at, scores: Score(id, type, value)')
        .order('created_at', { ascending: false })

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return { list: data, count }
}

const fetchResult = async (id) => {
    const { data, error } = await supabase
        .from('Run')
        .select('id, name: input_file, description, hypothesis, config: config_file, reference, createdAt: created_at, scores: Score(id, type, value), experiment: Experiment(id, name)')
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