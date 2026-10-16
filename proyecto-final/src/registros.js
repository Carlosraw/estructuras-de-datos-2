import { supabase } from "./supabase";

export async function listar(estructura) {
  const { data, error } = await supabase
    .from("registros")
    .select("*")
    .eq("estructura", estructura)
    .order("id");
  if (error) throw error;
  return data;
}

export async function agregar(estructura, datos) {
  const { data, error } = await supabase
    .from("registros")
    .insert({ estructura, datos })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function eliminar(id) {
  const { error } = await supabase.from("registros").delete().eq("id", id);
  if (error) throw error;
}
