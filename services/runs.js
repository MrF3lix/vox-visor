import { useQuery } from "@tanstack/react-query"
import { supabase } from "./supabase"

export const useRun = (id) => {
    return useQuery({ queryKey: ['run', id], queryFn: () => fetchRun(id) })
}

export const useRunStats = (id) => {
    return useQuery({ queryKey: ['run', 'stats', id], queryFn: () => fetchStats(id) })
}

export const useRunPlots = (id) => {
    return useQuery({ queryKey: ['run', 'plots', id], queryFn: () => fetchPlots(id) })
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

const fetchPlots = async (id) => {
    const { data, error } = await supabase
        .storage
        .from('assets')
        .list(id)

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return data.map(item => ({
        ...item,
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/${id}/${item.name}`
    }))
}

export const downloadPlot = async (plot) => {
    const path = plot.url.split('/assets/')[1]

    const { data, error } = await supabase
        .storage
        .from('assets')
        .download(path)

        if (error) {
            console.trace()
            console.error(error)
            throw error
        }

    saveBlob(data, plot.name)
}

const saveBlob = (blob, fileName) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};