import { Comida } from "../entities/comida";
import { Bebida } from "../entities/bebida";
import { Colacion } from "../entities/colacion";
import { Objetivo } from "../entities/objetivos";
import { PlanAlimenticio } from "../entities/plan_alimenticio";
import { Ingrediente } from "../entities/ingrediente";
import * as util from "../utils"

let plan;

beforeEach(() => {
    plan = new PlanAlimenticio();
})

test("obtener calificacion correspondiente segun los objetivos en todas las etapas", () => {
    let obj1 = new Objetivo();
    let obj2 = new Objetivo();
    let obj3 = new Objetivo();
    let obj4 = new Objetivo();

    plan.objetivos.push(obj1);
    plan.objetivos.push(obj2);
    plan.objetivos.push(obj3);
    plan.objetivos.push(obj4);

    // veo el estado a medida que voy cumpliendo objetivos
    expect(plan.generarEvaluacion()).toBe("Regular");
    obj1.completar();
    expect(plan.generarEvaluacion()).toBe("Regular");
    obj2.completar();
    expect(plan.generarEvaluacion()).toBe("Bueno");
    obj3.completar();
    expect(plan.generarEvaluacion()).toBe("Muy Bueno");
    obj4.completar();
    expect(plan.generarEvaluacion()).toBe("Excelente");

});

test("ver cantidad total de comidas en cada paso", () => {
    const comida1 = new Comida();
    const comida2 = new Comida();
    const comida3 = new Comida();
    const comida4 = new Comida();
    const comida5 = new Comida();

    expect(plan.cantidadDeComidas()).toBe(0);
    plan.agregarComida(comida1);
    expect(plan.cantidadDeComidas()).toBe(1);
    plan.agregarComida(comida2);
    expect(plan.cantidadDeComidas()).toBe(2);
    plan.agregarComida(comida3);
    expect(plan.cantidadDeComidas()).toBe(3);
    plan.agregarComida(comida4);
    expect(plan.cantidadDeComidas()).toBe(4);
    plan.agregarComida(comida5);
    expect(plan.cantidadDeComidas()).toBe(5);
});

test("ver la cantidad de comidas de cada tipo en cada paso", () => {
    let plan = new PlanAlimenticio();

    let comida1 = new Comida("DM");
    let comida2 = new Comida("AC");
    let comida3 = new Comida("AC");

    expect(plan.cantidadDeComidasDeTipo("DM")).toBe(0);
    expect(plan.cantidadDeComidasDeTipo("AC")).toBe(0);
    plan.agregarComida(comida1);
    expect(plan.cantidadDeComidasDeTipo("DM")).toBe(1);
    expect(plan.cantidadDeComidasDeTipo("AC")).toBe(0);
    plan.agregarComida(comida2);
    expect(plan.cantidadDeComidasDeTipo("DM")).toBe(1);
    expect(plan.cantidadDeComidasDeTipo("AC")).toBe(1);
    plan.agregarComida(comida3);
    expect(plan.cantidadDeComidasDeTipo("DM")).toBe(1);
    expect(plan.cantidadDeComidasDeTipo("AC")).toBe(2);
});

test("ver cantidad de colaciones permitidas en cada paso", () => {
    let plan = new PlanAlimenticio();
    let colacion1 = new Colacion();
    let colacion2 = new Colacion();
    let colacion3 = new Colacion();

    expect(plan.cantidadDeColacionesPermitidas()).toBe(0);
    plan.agregarColacion(colacion1);
    expect(plan.cantidadDeColacionesPermitidas()).toBe(1);
    plan.agregarColacion(colacion2);
    expect(plan.cantidadDeColacionesPermitidas()).toBe(2);
    plan.agregarColacion(colacion3);
    expect(plan.cantidadDeColacionesPermitidas()).toBe(3);
});

test("ver cantidad de bebidas permitidas en cada paso", () => {
    let bebida1 = new Bebida();
    let bebida2 = new Bebida();
    let bebida3 = new Bebida();

    expect(plan.cantidadDeBebidasPermitidas()).toBe(0);
    plan.agregarBebida(bebida1);
    expect(plan.cantidadDeBebidasPermitidas()).toBe(1);
    plan.agregarBebida(bebida2);
    expect(plan.cantidadDeBebidasPermitidas()).toBe(2);
    plan.agregarBebida(bebida3);
    expect(plan.cantidadDeBebidasPermitidas()).toBe(3);
});

test("plan fuerte en proteinas", () => {

    let comida1 = new Comida("AC");
    let comida2 = new Comida("AC");
    let ing1 = new Ingrediente(util.PROTEINA, 200);
    let ing2 = new Ingrediente(util.CARBOHIDRATO, 5);

    // primero veo que lo cumpla
    comida1.composicion.push(ing1);
    comida1.composicion.push(ing2);
    plan.comidas.push(comida1);
    expect(plan.esFuerteEnProteina()).toBeTruthy();

    // luego hago que no se cumpla
    comida2.composicion.push(ing2);
    plan.comidas.push(comida2);
    expect(plan.esFuerteEnProteina()).toBeFalsy();
});

test("plan bien verde", () => {

    let comida1 = new Comida("AC");
    let comida2 = new Comida("AC");
    let ing1 = new Ingrediente(util.VEGETAL, 200);
    let ing2 = new Ingrediente(util.CARBOHIDRATO, 5);
    
    // primero veo que lo cumpla
    comida1.composicion.push(ing1);
    comida1.composicion.push(ing2);
    plan.comidas.push(comida1);
    expect(plan.esBienVerde()).toBeTruthy();

    // luego hago que no se cumpla
    comida2.composicion.push(ing2);
    plan.comidas.push(comida2);
    expect(plan.esBienVerde()).toBeFalsy();

});