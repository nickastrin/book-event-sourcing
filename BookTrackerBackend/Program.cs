using BookTracker.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddMartenConfig(
        builder.Configuration,
        builder.Environment)
    .AddInfrastructure(builder.Configuration)
    .AddServices()
    .AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); 
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "v1");
    });
}

app.UseRouting();
app.UseCors("AllowReactApp");
app.MapControllers();
app.UseHttpsRedirection();

app.Run();