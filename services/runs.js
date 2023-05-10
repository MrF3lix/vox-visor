import { useQuery } from "@tanstack/react-query"
import { supabase } from "./supabase"

export const useRun = (id) => {
    return useQuery({ queryKey: ['run', id], queryFn: () => fetchRun(id) })
}

export const useRunStats = (id) => {
    return useQuery({queryKey: ['run', 'stats', id], queryFn: () => fetchStats(id)})
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

    return data
}

export const fetchTranscripts = async (runId, pageParam) => {
    const { data } = await supabase.rpc('get_transcripts', { run_id: runId, offset_n: pageParam })
    return {
        data,
        previousId: pageParam == 0 ? undefined : pageParam - 1,
        nextId: pageParam + 1
    }
}

export const saveRun = async (run) => {
    const { data, error } = await supabase
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
    const { data } = await supabase.rpc('get_run_stats', { run_id: id })
    return data[0]
}