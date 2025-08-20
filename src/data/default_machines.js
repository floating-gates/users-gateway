export const default_machines = [
    {
        machine_tag: 'fdm_3d_printer',
        name: 'FDM 3D Printer',
        description: 'Fused Deposition Modeling for rapid prototyping and production', specs: ['PLA/ABS', '±0.1mm precision', 'Multi-color'],
        cost_per_hour: 0,
        speed: 0,
        setup_cost: 0
    },
    {
        machine_tag: 'sls_3d_printer',
        name: 'SLS 3D Printer',
        description: 'Selective Laser Sintering for complex geometries and metal parts', specs: ['Metal/Plastic', '±0.03mm', 'No supports'],
        cost_per_hour: 0,
      speed: 0,
        setup_cost: 0
    },
    {
        machine_tag: 'sla_3d_printer',
        name: 'SLA 3D Printer',
        description: 'Stereolithography for high-resolution and smooth surface finishes', specs: ['Resin', '±0.005mm', 'Smooth finish'],
        cost_per_hour: 0,
        speed: 0,
        setup_cost: 0 },
    {
        machine_tag: 'cnc_3_axis',
        name: 'CNC 3-Axis',
        description: 'Computer Numerical Control machining for precision parts', specs: ['±0.01mm', 'Majority of Metals', 'Low speed'],
        cost_per_hour: 0,
        speed: 0,
        setup_cost: 0 },
    {
        machine_tag: 'cnc_5_axis',
        name: 'CNC 5-Axis',
        description: 'Advanced 5-axis machining for complex geometries', specs: ['Complex parts', 'Aerospace grade', 'Multi-angle'],
        cost_per_hour: 0,
        speed: 0,
        setup_cost: 0
    },
    {
        machine_tag: 'inj_mould',
        name: 'Injection Molding Machine',
        description: 'High-volume plastic part production with consistent quality',
        specs: ['Mass production', 'Plastics only', 'Fast cycle'],
        cost_per_hour: 0,
        speed: 0,
        setup_cost: 0
    }
]
