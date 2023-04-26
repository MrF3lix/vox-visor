import { useQuery } from "@tanstack/react-query"
import { supabase } from "./supabase"

export const useTranscript = (id) => {
    return useQuery({ queryKey: ['transcript', id], queryFn: () => fetchTranscript(id) })
}
const fetchTranscript = async (id) => {
    const { data, error } = await supabase
    .from('transcript')
    .select('id, name, createdAt: created_at, reference, hypothesis, run: run_id(config), metrics: metric(name: unit_name, value)')
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

export const saveTranscript = async (transcript) => {
    const {data, error} = await supabase
        .from('transcript')
        .update({
            name: transcript.name
        })
        .match({ id: transcript.id });

    if (error) {
        console.trace()
        console.error(error)
        throw error
    }

    return data
}
