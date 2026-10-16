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

export async function agregarVarios(estructura, lista) {
  const { data, error } = await supabase
    .from("registros")
    .insert(lista.map((datos) => ({ estructura, datos })))
    .select();
  if (error) throw error;
  return data.sort((a, b) => a.id - b.id);
}
