import { useQuery } from "@tanstack/react-query"
import { supabase } from "./supabase"

export const useRun = (id) => {
    return useQuery({ queryKey: ['run', id], queryFn: () => fetchRun(id) })
}

export const useTranscripts = (runId) => {
    return useQuery({ queryKey: ['transcripts', runId], queryFn: () => fetchTranscripts(runId) })
}

const fetchRun = async (id) => {
    const { data, error } = await supabase
    .from('run')
    .select('id, name, description, createdAt: created_at, config')
    .eq('id', id)
    .order('created_at', { ascending: false })
    .maybeSingle()

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    const stats = await fetchStats(id)
    
    return {
        ...data,
        stats
    }
}

const fetchTranscripts = async (runId) => {
    const {data} = await supabase.rpc('get_transcripts', {run_id: runId, offset_n: 0})
    return data
}

export const saveRun = async (run) => {
    const {data, error} = await supabase
        .from('run')
        .update({
            name: run.name,
            description: run.description
        })
        .match({ id: run.id });

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return data
}

const fetchStats = async (id) => {
    const {data} = await supabase.rpc('get_run_stats', {run_id: id})
    return data[0]
}