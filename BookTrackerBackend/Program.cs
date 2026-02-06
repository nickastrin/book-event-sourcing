using BookTracker.Api;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddMartenConfig(
        builder.Configuration,
        builder.Environment)
    .AddInfrastructure()
    .AddServices()
    .AddControllers();

var app = builder.Build();

app.UseRouting();
app.MapControllers();
app.UseHttpsRedirection();

app.Run();